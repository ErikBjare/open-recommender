import _ from "remeda";
import { Helpers, Task, TaskSpec, makeWorkerUtils } from "graphile-worker";

let workerUtilsPromise: ReturnType<typeof makeWorkerUtils> | null = null;

function workerUtils() {
  if (!workerUtilsPromise) {
    workerUtilsPromise = makeWorkerUtils({});
  }
  return workerUtilsPromise;
}

export function defineTask<TPayload>(options: {
  id: string;
  handler: (payload: TPayload, helpers: Helpers) => Promise<void>;

  // This is run in the caller's process before the task is enqueued. Ensure
  // that nothing long-running happens here.
  beforeEnqueue?: (payload: TPayload) => Promise<void>;

  // Default values for things like `priority` and `maxAttempts`.
  specDefaults?: TaskSpec;
}) {
  const enqueue = async (payload: TPayload, spec?: TaskSpec) => {
    const mergedSpec = { ...(options.specDefaults || {}), ...(spec || {}) };

    await options.beforeEnqueue?.(payload);

    const utils = await workerUtils();
    return await utils.addJob(options.id, payload, mergedSpec);
  };

  const handler = (payload: TPayload, helpers: Helpers) => {
    helpers.logger.debug(
      `Running task ${options.id} with payload: ${JSON.stringify(payload)}`
    );
    return options.handler(payload, helpers);
  };

  const task = {
    identifier: options.id,
    handler: handler as Task,
  };

  return {
    runNow: async (payload: TPayload) =>
      options.handler(payload, await workerUtils()),
    enqueue,
    task,
  };
}

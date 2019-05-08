/* eslint-disable class-methods-use-this */
import SchedulerInterface from './scheduler-interface';
import { schedule, delay } from './utils';

let INSTANCE;
/**
 * @ignore
 */
const func = x => process.nextTick(x);
/**
 * @ignore
 */
const sched = schedule(func);
/**
 * @ignore
 */
const timed = delay(func);

/**
 * A Scheduler that allows scheduling using process.nextTick.
 */
export default class TickScheduler extends SchedulerInterface {
  static get instance() {
    if (typeof INSTANCE === 'undefined') {
      INSTANCE = new TickScheduler();
    }
    return INSTANCE;
  }

  /**
   * Schedules the function immediately.
   * @param {!function} fn
   * A function that is called after being scheduled.
   * @returns {Cancellable}
   * Returns an Cancellable that allows
   * to cancel the schedule.
   */
  schedule(fn) {
    return sched(fn);
  }

  /**
   * Schedules the given function at a delayed time.
   * @param {!function} fn
   * A function that is called after being scheduled.
   * @param {!number} amount
   * The amount of delay in milliseconds.
   * @returns {Cancellable}
   * Returns an Cancellable that allows
   * to cancel the schedule.
   */
  delay(fn, amount) {
    return timed(fn, amount);
  }
}

import { concatMap, Observable, Subject } from "rxjs";

export const createSubjectObs = (
  handler: (...args: any[]) => Observable<Object>
) => {
  const subject = new Subject();
  const subjectObs = subject.asObservable();
  const result = subjectObs.pipe(
    concatMap((...args: any[]) => handler(...args))
  );
  return {
    next: subject.next.bind(subject),
    obs: result,
  };
};

import classnames from 'classnames'

let idsUpdaterMap: Map<string, (v: string) => void> = new Map();

/**
 * Merges two ids.
 * Different ids will trigger a side-effect and re-render components hooked up with `useId`.
 */
 export function mergeIds(idA: string, idB: string): string {
    if (idA === idB) {
      return idA;
    }
  
    let setIdA = idsUpdaterMap.get(idA);
    if (setIdA) {
      setIdA(idB);
      return idB;
    }
  
    let setIdB = idsUpdaterMap.get(idB);
    if (setIdB) {
      setIdB(idA);
      return idA;
    }
  
    return idB;
  }

/**
 * Calls all functions in the order they were chained with the same arguments.
 */
 export function chain(...callbacks: any[]): (...args: any[]) => void {
    return (...args: any[]) => {
      for (let callback of callbacks) {
        if (typeof callback === 'function') {
          callback(...args);
        }
      }
    };
  }
  

interface Props {
  [key: string]: any;
}

// taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V }
  ? V
  : never;
// eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, and ids are deduplicated - different ids
 * will trigger a side-effect and re-render components hooked up with `useId`.
 * For all other props, the last prop object overrides all previous ones.
 * @param args - Multiple sets of props to merge together.
 */
export function mergeProps<T extends Props[]>(
  ...args: T
): UnionToIntersection<TupleTypes<T>> {
  let result: Props = {};
  for (let props of args) {
    for (let key in result) {
      // Chain events
      if (
        /^on[A-Z]/.test(key) &&
        typeof result[key] === "function" &&
        typeof props[key] === "function"
      ) {
        result[key] = chain(result[key], props[key]);

        // Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
      } else if (
        key === "className" &&
        typeof result.className === "string" &&
        typeof props.className === "string"
      ) {
        result[key] = classnames(result.className, props.className);
      } else if (key === "id" && result.id && props.id) {
        result.id = mergeIds(result.id, props.id);
        // Override others
      } else {
        result[key] = props[key] !== undefined ? props[key] : result[key];
      }
    }

    // Add props from b that are not in a
    for (let key in props) {
      if (result[key] === undefined) {
        result[key] = props[key];
      }
    }
  }

  return result as UnionToIntersection<TupleTypes<T>>;
}

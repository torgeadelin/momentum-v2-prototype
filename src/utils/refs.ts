import { useRef, RefObject, Ref, useImperativeHandle } from "react";

/**
 * Abstraction layer over react refs
 */

export type DOMRef<T extends HTMLElement = HTMLElement> = Ref<DOMRefValue<T>>;
export interface DOMRefValue<T extends HTMLElement = HTMLElement> {
  getUnsafeRef(): T;
}

export function createRef<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
): DOMRefValue<T> {
  return {
    getUnsafeRef() {
      return ref.current!;
    },
  };
}

export function useDOMRef<T extends HTMLElement = HTMLElement>(
  ref: DOMRef<T>
): RefObject<T> {
  let domRef = useRef<T>(null);

  useImperativeHandle(ref, () => createRef(domRef));
  return domRef;
}


export function unwrapDOMRef<T extends HTMLElement>(
  ref: RefObject<DOMRefValue<T>>
): RefObject<T> {
  return {
    get current() {
      return ref.current && ref.current.getUnsafeRef();
    },
  };
}

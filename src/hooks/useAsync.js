import { useEffect, useState } from "react";
export default function useAsync(fn, deps = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    fn()
      .then(
        (data) => !cancelled && setState({ data, loading: false, error: null }),
      )
      .catch(
        (err) =>
          !cancelled &&
          setState({ data: null, loading: false, error: err.message }),
      );
    return () => {
      cancelled = true;
    };
  }, deps);

  return [state, setState];
}

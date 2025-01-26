import { parseAsBoolean, useQueryState } from "nuqs";

const useLogin = () => {
  const [open, setOpen] = useQueryState(
    "login",
    parseAsBoolean.withDefault(false)
  );
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return {
    open,
    onOpen,
    onClose,
  };
};

export default useLogin;

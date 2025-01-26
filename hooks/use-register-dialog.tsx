import { parseAsBoolean, useQueryState } from "nuqs";

const useRegister = () => {
  const [open, setOpen] = useQueryState(
    "register",
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

export default useRegister;

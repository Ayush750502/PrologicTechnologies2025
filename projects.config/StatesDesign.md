# States designs :

## For alerts

```ts

type AlertStateType = {
  title: string;
  description: string;
  confirmAction?: () => void;
} | null;

const [alert, setAlert] = useState<AlertStateType>(null);

const handleConfirm = () => {
  try {
    alert?.confirmAction?.();
  } catch (error) {
    console.error(error);
  } finally {
    setAlert(null);
  }
};
```
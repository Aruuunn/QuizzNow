import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  successButtonText?: string;
  cancelButtonText?: string;
}
export default function AlertDialog(props: Props) {
  const { open, onClose, onSuccess, successButtonText,cancelButtonText ,title,description} = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {cancelButtonText || "Disagree"}
          </Button>
          <Button onClick={onSuccess} color="primary" autoFocus>
            {successButtonText || "Agree"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

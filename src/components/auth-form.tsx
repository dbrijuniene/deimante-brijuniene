import React, { useContext } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import AuthContext from '../features/auth/auth-context';

type AuthFormProps = {
  formTitle: string,
  submitText: string,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
  onReset?: React.MouseEventHandler<Element>,
  resetText?: string,
  disabled: boolean
};

const contentWidth = 400;

const AuthForm: React.FC<AuthFormProps> = ({
  formTitle,
  submitText,
  onSubmit,
  children,
  onReset,
  resetText,
  disabled,
}) => {
  const { error, clearError } = useContext(AuthContext);

  return (
    <Container sx={{ position: 'relative', pt: 20 }}>
      {error && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert
            sx={{
              position: 'absolute',
              top: 0,
              minWidth: contentWidth,
              mt: 12,
            }}
            color="error"
            onClose={clearError}
          >
            {error}
          </Alert>
        </Box>
      )}
      <Paper
        component="form"
        elevation={3}
        sx={{
          display: 'flex',
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          p: 3,
          width: contentWidth,
        }}
        onSubmit={onSubmit}
      >
        <KeyIcon color="primary" fontSize="large" sx={{ fontSize: 70 }} />
        <Typography component="h5" variant="h5">{formTitle}</Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 1 / 1,
          my: 2,
        }}
        >
          {children}
        </Box>
        <Button disabled={disabled} variant="outlined" type="submit">{submitText}</Button>
        {onReset && (
          <Button variant="text" type="reset" onClick={onReset}>{resetText}</Button>
        )}
      </Paper>
    </Container>
  );
};

export default AuthForm;

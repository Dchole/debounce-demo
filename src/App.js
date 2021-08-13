import { useEffect, useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  useTheme
} from "@material-ui/core";
import LoginForm from "./components/LoginForm";

export const API = "https://jsonplaceholder.typicode.com/users";

export default function App() {
  const { typography } = useTheme();
  const [availableUsers, setAvailableUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await fetch(API).then((res) => res.json());
      setAvailableUsers((_prevUsers) => [...users.map((user) => user.name)]);
    })();
  }, []);

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Typography
        variant="h3"
        component="h1"
        align="center"
        fontSize={700}
        fontFamily={typography.heading.fontFamily}
      >
        Sign in
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        fontSize={600}
        fontFamily={typography.heading.fontFamily}
      >
        Available Users
      </Typography>
      <Box
        component="ul"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem 2rem",
          "& li": {
            wordWrap: "white-space"
          }
        }}
      >
        {availableUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </Box>
      <LoginForm availableUsers={availableUsers} />
    </Container>
  );
}

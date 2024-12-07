import "./App.module.css";
import { api } from "../utils/api";

export default function App() {
  const { data, isError, isLoading, error } = api.ping.useQuery();
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{data}</div>;
}

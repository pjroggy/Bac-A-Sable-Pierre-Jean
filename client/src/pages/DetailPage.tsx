import { useParams } from "react-router-dom";

export default function DetailPage() {
  const { id } = useParams();
  return <div>DetailPage {id}</div>;
}

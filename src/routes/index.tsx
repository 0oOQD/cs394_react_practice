import { createFileRoute } from '@tanstack/react-router'
import App from '../App.tsx';

// const Index = () => (
//      <div className="p-2">
//       <h3>Welcome Home!</h3>
//     </div>
// );

export const Route = createFileRoute('/')({
  component: App,
});
import { Link } from "react-router-dom";

export default function NavButton({ to, text, className, onclick }) {
  return (
    <Link to={to} onClick={onclick} className={className}>
      {text}
    </Link>
  );
}

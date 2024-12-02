import "./SidebarButton.css";

const Sidebarbutton = ({ title, action }) => {
  return (
    <div className="button-bg" onClick={action}>
      <h3> {title}</h3>
    </div>
  );
};

export default Sidebarbutton;
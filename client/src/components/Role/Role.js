import "./Role.css";

function Role({ role }) {
    if (role[0] === "R") {
        return <div className="role-box red">Your Role: {role}</div>;
    }
    return <div className="role-box blue">Your Role: {role}</div>;
}

export default Role;

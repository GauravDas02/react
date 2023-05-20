function Employee(props){
    return (
    <>
    <h3>Employee {props.name}</h3>
    {props.role ? 
    (
    <p class="role">{props.role}</p>)
    :   (
        <p class="norole">No roles</p>
    )    
}
    </>
    );
}

export default Employee;
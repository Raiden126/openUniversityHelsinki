const Total = (props) => {
    console.log(props)
    return (
        <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises} </p>
    )
}

export default Total;
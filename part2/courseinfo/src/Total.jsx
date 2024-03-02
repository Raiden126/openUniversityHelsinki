const Total = ({total}) => {

    const sum = total.reduce((exercises, sum) => {
        console.log(exercises, sum)
        return exercises + sum.exercises
    }, 0)

    return (
        <div>
            <h4>total of {sum} exercises</h4>
        </div>
    )
}

export default Total;
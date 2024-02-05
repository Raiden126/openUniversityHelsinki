import Part from "./Part";

const Content = (props) => {
    console.log(props)
    return (
      <div>
        <Part part={props.name[0].name} exercises={props.name[0].exercises} />
        <Part part={props.name[1].name} exercises={props.name[1].exercises} />
        <Part part={props.name[2].name} exercises={props.name[2].exercises} />
      </div>
    )
  }

export default Content;
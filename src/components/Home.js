import Note from './Note';
function Home(props) {

  return (
    <div className="container my-4">
    <Note mode={props.mode} showAlert = {props.showAlert}/>
    </div>
  )
}

export default Home

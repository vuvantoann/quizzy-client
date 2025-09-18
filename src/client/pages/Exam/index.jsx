import { useParams } from 'react-router-dom'
function Exam() {
  const params = useParams()

  const [post, setPost] = useState()

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/posts/detail/${params._id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data)
      })
  }, [])

  return (
    <>
      <div>Exam</div>
    </>
  )
}

export default Exam

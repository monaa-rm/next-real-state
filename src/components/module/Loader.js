import { ThreeDots } from 'react-loader-spinner'

const Loader = () => {
  return (
    <ThreeDots
    color="#304ffe"
    ariaLabel="three-dots-loading"
    visible={true}
    wrapperStyle={{ margin: "auto" }}
    height={45}
  />
  )
}

export default Loader

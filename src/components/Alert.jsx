const Alert = ({alert}) => {

  return (
    <div className={`${alert.error ? 'from-red-500 to-red-600' : 'from-indigo-500 to-indigo-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase font-bold text-sm mb-10`}>
        {alert.msg}
    </div>
  )
}

export default Alert;
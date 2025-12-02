import React from 'react'

export const Student = ({knownStudent}) => {
  return (
    <div>
      {/* <p>{knownStudent.map((stu) => stu.fullName)} </p> */}
      {knownStudent.map((stu) => <p key={stu._id} > {stu.fullName} </p>)}
      <br />
    </div>
  )
}

// import React from 'react'
// import useUserStore from '../store/userStore'

// function Profile() {

//   const user = useUserStore(state => state.user)


//   return (
//     <div className='flex justify-center items-center bg-slate-500'>


//       <div className="text-2xl">

//         <div>
//           firstName : {user?.firstName}

//         </div>
//         <div>

//           lastName : {user?.lastName}
//         </div>
//         <div>

//           Address : {user?.address}
//         </div>



//         <img src={user?.profileImage} alt="" />

//       </div>

//     </div>
//   )
// }

// export default Profile















































import React from 'react'
import useUserStore from '../store/userStore'

function Profile() {
  const user = useUserStore(state => state.user)

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 px-4">
      <div className="card w-full max-w-md bg-white shadow-xl p-6 rounded-xl">
        <div className="flex flex-col items-center text-center">
          <div className="avatar mb-4">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.profileImage || 'https://via.placeholder.com/150'}
                alt="profile"
              />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-1">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <div className="divider my-4"></div>

        <div className="space-y-2 text-gray-700">
          <div>
            <span className="font-semibold">First Name:</span> {user?.firstName}
          </div>
          <div>
            <span className="font-semibold">Last Name:</span> {user?.lastName}
          </div>
          <div>
            <span className="font-semibold">Address:</span> {user?.address || 'N/A'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

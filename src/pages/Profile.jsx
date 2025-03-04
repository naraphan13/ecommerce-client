import React from 'react'
import useUserStore from '../store/userStore'

function Profile() {

  const user = useUserStore(state => state.user)


  return (
    <div className='flex justify-center items-center bg-slate-500'>


      <div className="text-2xl">

        <div>
          firstName : {user?.firstName}

        </div>
        <div>

          lastName : {user?.lastName}
        </div>
        <div>

          Address : {user?.address}
        </div>



        <img src={user?.profileImage} alt="" />

      </div>

    </div>
  )
}

export default Profile
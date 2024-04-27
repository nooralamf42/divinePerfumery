import React from 'react'
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import appwriteService from '../appwrite/config'


function Cancellation() {
  const inputHandler = (e) =>{
    appwriteService.uploadImage(e.target.files[0])
    console.log(e.target.files[0])
  }
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" onInput={inputHandler}/>
    </div>
  )

  }
  


export default Cancellation
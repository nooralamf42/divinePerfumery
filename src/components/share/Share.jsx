import { BiShareAlt } from "react-icons/bi"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'


function Share({id}) {
  return (
    <Dialog>
  <DialogTrigger className="absolute right-0 pr-4 cursor-pointer"><BiShareAlt size={25}/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>this feature is not available</DialogTitle>
      {/* <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription> */}
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default Share
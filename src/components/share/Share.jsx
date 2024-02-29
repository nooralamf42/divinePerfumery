import { BiShareAlt } from "react-icons/bi";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

function Share({ id }) {
  return (
    <Dialog >
      <DialogTrigger className="absolute right-0 pr-4 cursor-pointer">
        <BiShareAlt size={25} />
      </DialogTrigger>
      <DialogContent className='w-[90%] sm:w-auto rounded-md'>
        <DialogTitle className='text-center mb-3'>Share on social media</DialogTitle>

        <div className="flex justify-center gap-2 flex-wrap">
          <FacebookShareButton
            url={`https://www.divineperfumers.com/product/${id}`}
          >
            <FacebookIcon round={true}/>
          </FacebookShareButton>
          <WhatsappShareButton
            url={`https://www.divineperfumers.com/product/${id}`}
          >
            <WhatsappIcon round={true} />
          </WhatsappShareButton>
          <TwitterShareButton
            url={`https://www.divineperfumers.com/product/${id}`}
          >
            <TwitterIcon round={true} />
          </TwitterShareButton>
          <TelegramShareButton
            url={`https://www.divineperfumers.com/product/${id}`}
          >
            <TelegramIcon round={true} />
          </TelegramShareButton>
          <EmailShareButton
            url={`https://www.divineperfumers.com/product/${id}`}
          >
            <EmailIcon round={true} />
          </EmailShareButton>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Share;

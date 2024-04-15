import { getUser } from "@/app/shared";

const MessageText = (
  visitirs_firstname: string,
  message_title: string,
  owner_phone: string
) => {
  const message = `Hi ${visitirs_firstname},%0AI%20hope%20this%20message%20finds%20you%20well.%20My%20name%20is%20${
    getUser()?.HMFirstname
  },%20I%20came%20in%20contact%20with%20your%20number%20through%20Homly%20Housing%20Platform%20and%20I%20am%20interested%20in%20this%20property%20you%20published%20with%20the%20Title:%20${message_title}.%0AThank%20you%20for%20your%20time,%20and%20I%20look%20forward%20to%20hearing%20from%20you%20soon.`;

  const redirectUser = `https://wa.me/+234${owner_phone}?text=${message}`;
  return redirectUser;
};

export default MessageText;

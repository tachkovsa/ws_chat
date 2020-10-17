export class WTMessage {
  // id: string;
  // block_message_id: string;
  // create_date: string;
  // disp_roles: [];
  // files: { name: string; type: string; url: string }[];
  // recipients: string[];
  // sender: { id: string; disp_name: string; icon_url: string };
  // text: string;
  // type_id: string;

  constructor(...args) {}
}

export class Message {
  // id: string;
  // blockMessageId: string;
  // createDate: Date;
  // dispRoles: [];
  // files: { name: string; type: string; url: string }[];
  // recipients: string[];
  // sender: { id: string; dispName: string; iconUrl: string };
  // text: string;
  // typeId: string;

  constructor(payload) {
    this.id = payload.id;
    this.blockMessageId = payload.id;
    this.createDate = new Date(payload.create_date) || null;
    this.dispRoles = payload.disp_roles;
    this.files = payload.files;
    this.recipients = payload.recipients;
    this.sender = {
      id: payload.sender?.id,
      dispName: payload.sender?.disp_name,
      iconUrl: payload.sender?.icon_url,
    };
    this.text = payload.text;
    this.typeId = payload.type_id;
  }
}

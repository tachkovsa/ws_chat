import { WTMessage, Message } from './message.model';

export class WTConversation {
//   id: string;
//   actions: { id: string; name: string }[];
//   disp_roles: [];
//   format_id: string;
//   icon_url: string;
//   is_public: boolean;
//   last_unread_message: string;
//   last_unread_message_date: string;
//   participants: { date: string; participant_id: string; state: string }[];
//   message_count: number;
//   messages: WTMessage[];
//   name: string;
//   object_id: string;
//   object_name: string;
//   object_type: string;
//   unread_message: number;
//   unread_message_count: number;

  constructor(...args) {

  }
}

export class Conversation {
  _lastUnreadMessageDate = null;
  _participants = [];
  _messages = [];

  constructor(payload) {
    this.id = payload.id;
    this.actions = payload.actions;
    this.dispRoles = payload.disp_roles;
    this.formatId = payload.format_id;
    this.iconUrl = payload.icon_url;
    this.isPublic = payload.is_public;
    this.lastUnreadMessage = payload.last_unread_message;
    this.lastUnreadMessageDate = payload.last_unread_message_date; // new Date(payload.last_unread_message_date) || null;
    this.participants = payload.participants; //payload.participants.map((p) => ({
    //   date: new Date(p.date) || null,
    //   participantId: p.participant_id,
    //   state: p.state,
    // }));
    this.messages = payload.messages; //payload.messages.map((m) => new Message(m));
    this.messageCount = payload.message_count || this.messages.length;
    this.name = payload.name;
    this.objectId = payload.object_id;
    this.objectName = payload.object_name;
    this.objectType = payload.object_type;
    this.unreadMessageCount = payload.unread_message || payload.unread_message_count || 0;
  }

  get lastUnreadMessageDate() {
    return this._lastUnreadMessageDate;
  }

  set lastUnreadMessageDate(value) {
    this._lastUnreadMessageDate = new Date(value) || null;
  }

  get participants() {
    return this._participants;
  }

  set participants(value) {
    this._participants = Array.isArray(value) ? value.map((p) => ({
      date: new Date(p.date) || null,
      participantId: p.participant_id,
      state: p.state,
    })) : [];
  }

  get messages() {
    return this._messages;
  }

  set messages(value) {
    this._messages = Array.isArray(value) ? value.map((m) => new Message(m)) : [];
  }

  update(payload) {
    const snakeToCamel = str => str.replace(/([-_]\w)/g, g => g[1].toUpperCase());

    Object.keys(payload).forEach(key => {
      const camelKey = snakeToCamel(key);
      this[camelKey] = payload[key];
    });

    return this;
    // snakeToCamel = str => str.replace(/([-_]\w)/g, g => g[1].toUpperCase());
    // camelToSnake = field.split(/(?=[A-Z])/).join('_').toLowerCase();
  }
}

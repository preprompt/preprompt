import {
  Account,
  CoMap,
  Group,
  Profile,
  co,
  CoPlainText,
  CoList,
} from "jazz-tools"

// public fields
export class JazzProfile extends Profile {
  username = co.string
}
// private fields
export class AccountRoot extends CoMap {
  chats = co.ref(ListOfChats)
}

// chat has messages inside between user and AI
export class Chat extends CoMap {
  name = co.string
  messages = co.ref(ListOfChatMessages)
}
export class ListOfChats extends CoList.Of(co.ref(Chat)) {}

// chat message contains content
export class ChatMessage extends CoMap {
  content = co.string
  text = co.ref(CoPlainText)
}
export class ListOfChatMessages extends CoList.Of(co.ref(ChatMessage)) {}

export class JazzAccount extends Account {
  profile = co.ref(JazzProfile)
  root = co.ref(AccountRoot)
  migrate(this: JazzAccount) {
    if (this.root === undefined) {
      const group = Group.create()
      this.root = AccountRoot.create({ chats: ListOfChats.create([]) }, group)
    }
  }
}

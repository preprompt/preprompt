import { co, CoMap, CoList, Account, CoPlainText, CoFeed } from "jazz-tools"

export class Reactions extends CoFeed.Of(co.string) {}

export class ChatMessage extends CoMap {
  content = co.string
  text = co.ref(CoPlainText)
  role = co.literal("user", "system", "assistant")

  reactions = co.optional.ref(Reactions)
}

export class ListOfChatMessages extends CoList.Of(co.ref(ChatMessage)) {}

export class Chat extends CoMap {
  name = co.string
  messages = co.ref(ListOfChatMessages)
}

export class UserRoot extends CoMap {
  chats = co.ref(ListOfChats)
}

export class ListOfChats extends CoList.Of(co.ref(Chat)) {}

export class ChatAccount extends Account {
  root = co.ref(UserRoot)

  async migrate() {
    console.log("migrate", this._refs.root)
    if (!this._refs.root) {
      this.root = UserRoot.create(
        {
          chats: ListOfChats.create([], this),
        },
        this,
      )
      console.log("created root")
    }
    const res = await this.root?.ensureLoaded({ chats: [] })
    console.log("res", res)
    console.log("this.root", this.root)
  }
}

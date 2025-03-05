import { Account, co, CoList, CoMap, Group, Profile } from "jazz-tools"

// TODO: not actually sure what diff is there between Profile and User
// is it public/private access only?

// public fields
export class JazzProfile extends Profile {
  username = co.string
}
// private fields
export class AccountRoot extends CoMap {
  websites = co.ref(ListOfWebsites)
}

export class Website extends CoMap {
  url = co.string // unique
  name = co.string
  urls = co.ref(ListOfUrls)
}
export class ListOfWebsites extends CoList.Of(co.ref(Website)) {}

export class Url extends CoMap {
  absoluteUrl = co.string
  content = co.string
}
export class ListOfUrls extends CoList.Of(co.ref(Url)) {}

export class JazzAccount extends Account {
  profile = co.ref(JazzProfile)
  root = co.ref(AccountRoot)
  migrate(this: JazzAccount) {
    if (this.root === undefined) {
      const group = Group.create()
      this.root = AccountRoot.create(
        { websites: ListOfWebsites.create([]) },
        group,
      )
    }
  }
}

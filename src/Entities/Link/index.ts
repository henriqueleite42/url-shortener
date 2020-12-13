import { uuid } from "uuidv4";

import { ICreate, IGetList, IEdit } from "./types";

import Time from "@Utils/Time";

import { db } from "@Config/Firebase";

import { ILink } from "@Types/Link";

class LinkEntity {
  private _collection: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >;

  constructor() {
    this._collection = db.collection("links");
  }

  public async create({ name, code, redirectTo, userID }: ICreate) {
    const id = uuid();

    const linkData: ILink = {
      id,
      code,
      name,
      redirectTo,
      userID,
      createdAt: new Time().getMillis,
    };

    await this._collection.doc(id).set(linkData);

    return id;
  }

  public async edit({ id, name, code, redirectTo }: IEdit) {
    const newLinkData: Partial<ILink> = {
      id,
    };

    if (name) newLinkData.name = name;
    if (code) newLinkData.code = code;
    if (redirectTo) newLinkData.redirectTo = redirectTo;

    await this._collection.doc(id).update(newLinkData);

    return id;
  }

  public async getList({ userID }: IGetList) {
    const linksSnap = await this._collection.where("id", "==", userID).get();

    const linksData = linksSnap.docs.map((doc) => doc.data() as ILink);

    return linksData;
  }

  public async getLink(linkID: string) {
    const linksSnap = await this._collection.doc(linkID).get();

    const linksData = linksSnap.data() as ILink;

    return linksData;
  }
}

export default LinkEntity;

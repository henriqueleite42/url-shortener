import { uuid } from "uuidv4";

import { ICreate } from "./types";

import Time from "@Utils/Time";

import { db } from "@Config/Firebase";

import { IClick } from "@Types/Click";

class ClickEntity {
  private _collection: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >;

  constructor() {
    this._collection = db.collection("links");
  }

  public async create({ linkID, country, comeFrom }: ICreate) {
    const id = uuid();

    const clickData: IClick = {
      id,
      linkID,
      country,
      clickedAt: new Time().getMillis,
    };

    if (comeFrom) clickData.comeFrom = comeFrom;

    await this._collection.doc(id).set(clickData);

    return id;
  }
}

export default ClickEntity;

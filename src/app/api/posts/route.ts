import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import {
  setDoc,
  doc,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
} from 'firebase/firestore';

import db from '@/lib/firestore-config';

const collection_name = 'codedaze_posts';
const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = searchParams.get('pageSize');
    const pageToken = searchParams.get('pageToken');
    const pageSizeNum = Number(pageSize);
    const colRef = collection(db, collection_name);
    let q = query(colRef, orderBy('date', 'desc'), limit(pageSizeNum));
    if (pageToken) {
      const startAfterDoc = await getDoc(doc(db, collection_name, pageToken));
      q = query(
        colRef,
        orderBy('date'),
        startAfter(startAfterDoc),
        limit(pageSizeNum)
      );
    }
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const nextPageToken = lastVisible ? lastVisible.id : null;
    return NextResponse.json({ data, nextPageToken });
  } catch (error) {
    console.error('Error fetching data: ', error);
    return NextResponse.json(
      { error: 'Unable to fetch data' },
      { status: 500 }
    );
  }
};
const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const id = uuidv4();
    const result = await setDoc(doc(db, collection_name, id), data, {
      merge: true,
    });
    return NextResponse.json({ post: result, id });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};

export { GET, POST };

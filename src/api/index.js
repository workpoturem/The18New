import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  limit,
} from 'firebase/firestore';
import { firebase } from '@/firebase';

const db = firebase.db;

export const fetchTopics = async () => {
  let topics = [];
  const queryRef = query(collection(db, 'topics'));
  const response = await getDocs(queryRef)
  response.forEach((doc) => {
    topics.push(doc.data());
  });

  return topics;
};

export const fetchWorks = async (type, limitCount) => {
  let works = [];
  const queryRef = query(collection(db, 'works'), where('topic', '==', type), limit(limitCount));
  const response = await getDocs(queryRef);
  response.forEach((doc) => {
    works.push(doc.data());
  });

  return works;
};

export const fetchCarouselWorks = async () => {
  let works = [];
  const queryRef = query(collection(db, 'works'), where('isCarousel', '==', true))
  const response = await getDocs(queryRef);
  response.forEach((doc) => {
    works.push(doc.data());
  });

  return works;
}

export const fetchTopWorks = async (limitCount = 3) => {
  let works = [];
  const queryRef = query(collection(db, 'works'), where('isBest', '==', true), limit(limitCount))
  const response = await getDocs(queryRef);
  response.forEach((doc) => {
    works.push(doc.data());
  });

  return works;
}

export const fetchFreeWorks = async (limitCount = 3) => {
  let works = [];
  const queryRef = query(collection(db, 'works'), where('isFree', '==', true), limit(limitCount))
  const response = await getDocs(queryRef);
  response.forEach((doc) => {
    works.push(doc.data());
  });

  return works;
}

export const fetchWork = async (slug) => {
  const docRef = doc(db, 'works', slug);
  const response = await getDoc(docRef);

  return response.data();
};

export const sendEmail = async (email) => {
  await setDoc(doc(db, 'emails', email), {
    email,
  })
}

export const setOrder = async (data) => {
  try {
    await setDoc(doc(db, 'orders', data.email), {
      name: data.name,
      email: data.email,
      description: data.description,
    })
  }
  catch (e) {
    console.log(e)
  }
}
'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '../lib/supabase';

const SPOT_ID = 'love-library';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function StudySpotPage() {
  const [spot, setSpot] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  async function loadSpot() {
    setLoading(true);
    setLoadError('');
    try {
      const db = getSupabase();
      if (!db) throw new Error('Setup needed: add the Supabase URL and publishable key to .env.local. See README.md.');
      const [spotResult, reviewResult] = await Promise.all([
        db.from('study_spots').select('id,name,image_url,image_alt').eq('id', SPOT_ID).single(),
        db.from('reviews').select('id,rating,comment,created_at').eq('spot_id', SPOT_ID).order('created_at', { ascending: false }),
      ]);
      if (spotResult.error || reviewResult.error) throw new Error('We could not load this study spot. Check your connection and try again.');
      setSpot(spotResult.data);
      setReviews(reviewResult.data);
      setImageFailed(false);
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadSpot(); }, []);

  async function submitReview(event) {
    event.preventDefault();
    if (saving) return;
    setSuccess('');
    setSubmitError('');
    const score = Number(rating);
    const text = comment.trim();
    if (!Number.isInteger(score) || score < 1 || score > 5 || !text || text.length > 1000) {
      setSubmitError('Choose a rating and write a comment of 1–1,000 characters.');
      return;
    }
    setSaving(true);
    try {
      const db = getSupabase();
      if (!db) throw new Error('Reviews are unavailable until Supabase is connected.');
      // Anonymous Auth gives each browser a user ID without adding a login page.
      const { data: { session }, error: sessionError } = await db.auth.getSession();
      if (sessionError) throw new Error('Could not start your session. Please try again.');
      let user = session?.user;
      if (!user) {
        const { data, error } = await db.auth.signInAnonymously();
        if (error) throw new Error('Could not start your session. Please try again. The project must allow anonymous sign-ins.');
        user = data.user;
      }
      const { data, error } = await db.from('reviews').insert({
        spot_id: SPOT_ID, user_id: user.id, rating: score, comment: text,
      }).select('id,rating,comment,created_at').single();
      if (error) throw new Error('We could not confirm your review was saved. Refresh to check before trying again.');
      setReviews(previous => [data, ...previous]);
      setRating('');
      setComment('');
      setSuccess('Your review has been saved.');
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSaving(false);
    }
  }

  const imageSrc = spot?.image_url?.startsWith('/') ? `${basePath}${spot.image_url}` : spot?.image_url;

  return <>
    <header><div className="header-inner"><strong>RateMy<span>Study</span></strong><span>SDSU</span></div></header>
    <main>
      <p className="eyebrow">STUDY SPOT</p>
      <h1>{spot?.name || 'Love Library'}</h1>
      <p className="intro">A place to study. A place to share your experience.</p>
      {loading && <p role="status">Loading study spot…</p>}
      {loadError && <div className="notice" role="alert"><p>{loadError}</p><button type="button" onClick={loadSpot}>Try again</button></div>}
      {!loading && !loadError && spot && <>
        <figure>
          {!imageFailed && imageSrc ? <img src={imageSrc} alt={spot.image_alt} width="800" height="600" onError={() => setImageFailed(true)} /> : <p className="notice">The study spot photo is unavailable.</p>}
          <figcaption>Love Library, SDSU. Photo: Phil Konstantin · <a href="https://commons.wikimedia.org/wiki/File:LoveLibrarySDSUByPhilKonstantin.jpg">Photo source</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a> (display cropped)</figcaption>
        </figure>
        <div className="columns">
          <section className="panel" aria-labelledby="review-form-title">
            <h2 id="review-form-title">Leave a review</h2>
            <p>How was studying here?</p>
            <form onSubmit={submitReview}>
              <fieldset disabled={saving}>
                <label htmlFor="rating">Your rating</label>
                <select id="rating" value={rating} onChange={event => setRating(event.target.value)} required>
                  <option value="">Select a rating</option>
                  {[1,2,3,4,5].map(value => <option key={value} value={value}>{value} / 5{value === 1 ? ' — Poor' : value === 5 ? ' — Excellent' : ''}</option>)}
                </select>
                <label htmlFor="comment">Your comment</label>
                <textarea id="comment" value={comment} onChange={event => setComment(event.target.value)} required maxLength={1000} rows={5} placeholder="What should other students know?" aria-describedby="comment-help" />
                <p id="comment-help" className="hint">{comment.length}/1,000 characters · Reviews are public.</p>
                <button type="submit">{saving ? 'Saving…' : 'Submit review'}</button>
              </fieldset>
              {submitError && <p role="alert" className="error">{submitError}</p>}
              {success && <p role="status" className="success">{success}</p>}
            </form>
          </section>
          <section className="panel" aria-labelledby="reviews-title">
            <h2 id="reviews-title">Student reviews <span className="count">({reviews.length})</span></h2>
            {reviews.length === 0 ? <p>No reviews yet. Be the first to share your experience.</p> : <ul className="reviews">
              {reviews.map(review => <li key={review.id}>
                <div className="review-meta"><strong>{review.rating} / 5</strong><time dateTime={review.created_at}>{new Date(review.created_at).toLocaleDateString()}</time></div>
                <p>{review.comment}</p>
              </li>)}
            </ul>}
          </section>
        </div>
      </>}
    </main>
    <footer>RateMyStudy · A student-built project</footer>
  </>;
}

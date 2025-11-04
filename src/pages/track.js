class Track {
  constructor(data) {
    // Basic Track Info
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.genre = data.genre;
    this.duration = data.duration;
    this.releaseDate = data.release_date;
    this.playCount = data.play_count;
    this.favoriteCount = data.favorite_count;
    this.repostCount = data.repost_count;
    this.commentCount = data.comment_count;
    this.permalink = data.permalink;
    this.tags = data.tags;
    this.artwork = data.artwork;
    this.isDownloadable = data.is_downloadable;
    this.isStreamable = data.is_streamable;
    this.trackCID = data.track_cid;
    this.isOriginalAvailable = data.is_original_available;

    // Optional/Additional fields
    this.origFileCID = data.orig_file_cid;
    this.previewCID = data.preview_cid;
    this.mood = data.mood;
    this.albumBacklink = data.album_backlink;

    // Nested User Info (flattened into the Track class for convenience)
    const user = data.user;
    this.user = {
      id: user.id,
      name: user.name,
      handle: user.handle,
      bio: user.bio,
      location: user.location,
      followerCount: user.follower_count,
      followeeCount: user.followee_count,
      isVerified: user.is_verified,
      profilePicture: user.profile_picture,
      coverPhoto: user.cover_photo,
      twitter: user.twitter_handle,
      instagram: user.instagram_handle,
      website: user.website,
      trackCount: user.track_count,
      playlistCount: user.playlist_count,
    };
  }

  // Example computed property (formatted duration)
  get formattedDuration() {
    const mins = Math.floor(this.duration / 60);
    const secs = this.duration % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // Example computed property (full permalink)
  get fullPermalink() {
    return `https://audius.co${this.permalink}`;
  }
}

export default Track;

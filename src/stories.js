import React from 'react';
import { MemoryRouter } from 'react-router';
import { addDecorator, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { link } from '@storybook/addon-links';
import { IntlProvider } from 'react-intl';
import { post, postWithEmbed, postState, notifications } from './stories.data';
import StartNow from '../src/components/Sidebar/StartNow';
import Topics from '../src/components/Sidebar/Topics';
import InterestingPeople from '../src/components/Sidebar/InterestingPeople';
import Topic from '../src/components/Button/Topic';
import Follow from '../src/components/Button/Follow';
import Action from '../src/components/Button/Action';
import Topnav from './components/Navigation/Topnav';
import Sidenav from './components/Navigation/Sidenav';
import Story from './components/Story/Story';
import StoryLoading from './components/Story/StoryLoading';
import StoryFull from './components/Story/StoryFull';
import UserMenu from './components/UserMenu';
import UserHeader from './components/UserHeader';
import Comments from './components/Comments/Comments';
import Editor from './components/Editor/Editor';
import TopicSelector from './components/TopicSelector';
import '../src/styles/common.less';

addDecorator(story => (
  <MemoryRouter initialEntries={['/']}>
    <IntlProvider locale="en">
      <div style={{ padding: '40px', background: '#f9f9f9' }}>
        {story()}
      </div>
    </IntlProvider>
  </MemoryRouter>
));

const rootComments = Object.keys(postState.content)
  .filter(key => postState.content[key].depth === 1)
  .map(commentKey => postState.content[commentKey]);

const commentsChildren = {};
Object.keys(postState.content)
  .forEach((key) => {
    commentsChildren[postState.content[key].id] = postState.content[key].replies
      .map(childrenId => postState.content[childrenId]);
  });

storiesOf('Button', module)
  .add('Topic', () => <Topic name="travel" />)
  .add('Favored topic', () => <Topic favorite name="photography" />)
  .add('Closable topic', () => <Topic closable name="travel" onClose={action('Close')} />)
  .add('Follow', () => <Follow />)
  .add('Followed', () => <Follow isFollowed />)
  .add('Action', () => <Action text="Transfer" />);

storiesOf('Navigation', module)
  .add('Topnav unlogged', () => <Topnav />)
  .add('Topnav logged', () => <Topnav
    username="guest123"
    notifications={notifications}
    onNotificationClick={action('Notification click')}
    onSeeAllClick={action('SeeAll click')}
    onMenuItemClick={action('Menu item click')}
  />)
  .add('Sidenav unlogged', () => <Sidenav />)
  .add('Sidenav logged', () => <Sidenav username="guest123" />);

storiesOf('Sidebar', module)
  .add('Start now', () => <StartNow />)
  .add('Favorite topics', () =>
    <Topics favorite title="Favorite topics" topics={['funny', 'history', 'nature']} />
  )
  .add('Trending topics', () =>
    <Topics
      title="Trending topics"
      topics={['photography', 'steemit', 'introduceyourself', 'steem', 'story', 'blog']}
    />
  )
  .add('Interesting People', () =>
    <InterestingPeople
      users={[
        { name: 'liondani', about: 'Inch by Inch, Play by Play' },
        {
          name: 'good-karma',
          about: '"Action expresses priorities!" / Witness - Developer of eSteem…'
        },
        { name: 'furion', about: 'I’ve developed SteemData and SteemSports. All things Python…' }
      ]}
    />
  );

storiesOf('Story', module)
  .add('Story loading', () => <StoryLoading />)
  .add('Inline story', () => <Story
    post={post}
    onFollowClick={action('Follow click')}
    onSaveClick={action('Save click')}
    onReportClick={action('Report click')}
    onLikeClick={action('Like click')}
    onDislikeClick={action('Dislike click')}
    onCommentClick={action('Comment click')}
    onShareClick={action('Share click')}
  />)
  .add('Inline story with embed', () => <Story
    post={postWithEmbed}
    onFollowClick={action('Follow click')}
    onSaveClick={action('Save click')}
    onReportClick={action('Report click')}
    onLikeClick={action('Like click')}
    onDislikeClick={action('Dislike click')}
    onCommentClick={action('Comment click')}
    onShareClick={action('Share click')}
  />)
  .add('Full story', () => <StoryFull
    post={post}
    commentCount={Object.keys(postState.content).length}
    onFollowClick={action('Follow click')}
    onSaveClick={action('Save click')}
    onReportClick={action('Report click')}
    onLikeClick={action('Like click')}
    onDislikeClick={action('Dislike click')}
    onCommentClick={action('Comment click')}
    onShareClick={action('Share click')}
  />)
  .add('Full story with embed', () => <StoryFull
    post={postWithEmbed}
    commentCount={Object.keys(postState.content).length}
    onFollowClick={action('Follow click')}
    onSaveClick={action('Save click')}
    onReportClick={action('Report click')}
    onLikeClick={action('Like click')}
    onDislikeClick={action('Dislike click')}
    onCommentClick={action('Comment click')}
    onShareClick={action('Share click')}
  />);

storiesOf('Profile', module)
  .add('UserHeader', () => <UserHeader username="roelandp" />)
  .add('UserMenu', () => <UserMenu discussions={1521} comments={21} following={244} onChange={action('Section changed')} />);

storiesOf('Comments', module)
  .add('Comments', () => <Comments
    comments={rootComments}
    commentsChildren={commentsChildren}
    onLikeClick={action('Like click')}
    onDislikeClick={action('Dislike click')}
  />);

storiesOf('Editor', module)
  .add('Editor', () => <Editor
    recentTopics={['bitcoin', 'steemit', 'busy']}
    popularTopics={['life', 'travel', 'nature', 'money', 'story']}
    onSubmit={action('Form submit')}
    onError={action('Form error')}
    onImagePasted={
      (image, callback) => {
        // NOTE: Upload image to server.
        setTimeout(() => callback('https://placehold.it/200x200'), 500);
      }
    }
  />);

storiesOf('Topic selector', module)
  .add('Topic selector', () => (
    <TopicSelector
      topics={['photography', 'travel']}
      onTopicClose={action('Topic close')}
      onSortChange={action('Sort change')}
    />));

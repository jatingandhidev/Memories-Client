import Post from './Post/Post'
import { Grid, CircularProgress } from '@material-ui/core'
import useStyles from './styles'
import { useSelector } from 'react-redux'

const Posts = ({ setCurrentId }) => {
  const classes = useStyles()
  const { posts, isLoading } = useSelector((state) => state.posts)

  if (!posts.length && !isLoading) return 'No Posts'
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
}
export default Posts

import React from 'react';
import Categories from '@/components/Categories';
import Comments from '@/components/Comments';
import MostPopularPosts from '@/components/MostPopularPosts';
import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { SinglePostType } from '@/consts/types';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import EditorPick from '@/components/EditorPick';
import { getServerSession } from '@/auth';
import GoBackButton from '@/components/GoBackButton';

async function getPost(slug: string, sessionData: any) {
  try {
    const post = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${slug}`,
      {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({
          userEmail: sessionData?.user?.email ? sessionData.user.email : '',
        }),
      }
    );

    if (!post.ok) {
      throw new Error(post.statusText);
    }

    //return data as JSON
    return post.json();
  } catch (error: any) {
    console.log('🚀 ~ getPost ~ error:\n\n\n\n\n', error);
    toast.error(error.message);
    return { post: null };
  }
}

async function SingleBlog({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = await Promise.resolve(params);
  const sessionData = await getServerSession();

  const postData: { post: SinglePostType } = await getPost(blogId, sessionData);

  const post = postData?.post;

  return (
    <>
      <Container spacing='none'>
        <Spacer size={8} />
        <GoBackButton />
      </Container>

      <Container variant={'fluid'}>
        <Row>
          <Container spacing='none'>
            <Row>
              <Col
                lg={6}
                className='flex flex-col justify-between dark:text-white'
              >
                <div className='flex items-start gap-4 justify-between flex-col'>
                  <h3 className='font-bold line-clamp-4'>{post?.title}</h3>
                  <div className='flex items-center gap-8'>
                    <div className='flex items-center gap-4'>
                      {post?.user?.image && (
                        <Image
                          src={post?.user?.image}
                          alt='blog image'
                          width={50}
                          height={50}
                          className='w-10 h-10 object-cover rounded-full'
                        />
                      )}
                      <div className='text-baseline-400'>
                        <p className='font-semibold '>{post?.user?.name}</p>
                        {post?.createdAt && (
                          <p className='text-s '>
                            {format(new Date(post?.createdAt), 'MMM dd yyyy')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <p className='text-sm font-bold'>{post?.views}</p>
                      <Eye />
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={6}>
                <div className='relative h-[400px] w-full rounded-md'>
                  <Image
                    src={post?.img || '/default-cover-image.webp'}
                    alt='blog image'
                    fill
                    className='w-full h-full  object-contain rounded-lg'
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={7} className=' dark:text-baseline-200 text:baseline-950'>
                <Spacer size={16} />
                {post?.desc && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.desc,
                    }}
                  />
                )}

                <Spacer size={16} />

                <Comments postSlug={post?.slug} />
              </Col>
              <Col
                lg={4}
                lgOffset={1}
                className='dark:text-baseline-200 text:baseline-950'
              >
                <Spacer size={16} />

                <EditorPick postEditorEmail={post?.userEmail} />

                <Spacer size={16} />
                <MostPopularPosts />

                <Spacer size={16} />
                <Categories />
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
}

export default SingleBlog;

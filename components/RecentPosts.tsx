'use client';
import React, { useState } from 'react';
import { Spacer } from './UI/spacer/spacer';
import Image from 'next/image';
import { Button } from './UI/Button/Button';
import { Col, Row } from './UI/Grid';
import Link from 'next/link';
import { PostArrayType } from '@/consts/types';
import { format } from 'date-fns';
import { Edit, Eye, Newspaper, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/UI/Modal/modal';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function RecentPosts({
  posts,
  type,
  numberOfPosts,
  page,
  refetchPosts,
}: {
  posts: PostArrayType;
  type?: 'home' | 'category' | 'my-articles';
  numberOfPosts?: number;
  page?: number;
  refetchPosts?: () => void;
}) {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState({
    modal: false,
    postSlug: '',
  });
  function handleDeletePost(postSlug: string) {
    setDeleteModalOpen({ modal: true, postSlug: postSlug });
  }

  async function handleIsConfirmedDeletePost() {
    if (deleteModalOpen.postSlug === '') {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-articles/${deleteModalOpen.postSlug}`,
        {
          method: 'DELETE',
          body: JSON.stringify({
            postSlug: deleteModalOpen.postSlug,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('This blog was not found');
      }
      toast.success('Post deleted successfully');
      setDeleteModalOpen({ modal: false, postSlug: '' });
      refetchPosts && refetchPosts();
    } catch (error: any) {
      console.log('🚀 ~ error:\n\n\n\n', error);
      toast.error(error.message);
    }
  }
  return (
    <>
      {/* MODAL DELETE POST */}
      <Dialog
        open={deleteModalOpen.modal}
        onOpenChange={() =>
          setDeleteModalOpen((prev) => {
            return {
              modal: !prev.modal,
              postSlug: prev.postSlug,
            };
          })
        }
      >
        <DialogContent className=' z-50 border border-baseline-100 bg-white dark:bg-baseline-700 '>
          <DialogHeader
            className='dark:text-white'
            title={'  Are you absolutely sure?'}
            position={'center-aligned'}
            description={
              'This action cannot be undone. This will permanently delete your article.'
            }
            icon={<Newspaper />}
          ></DialogHeader>
          <DialogFooter
            position='horizontal-fill'
            onCancel={() => setDeleteModalOpen({ modal: false, postSlug: '' })}
            onConfirm={() => handleIsConfirmedDeletePost()}
          ></DialogFooter>
        </DialogContent>
      </Dialog>
      <div className='flex justify-between items-center font-bold'>
        <div className='flex justify-between w-full gap-4 '>
          <div className='flex gap-4 items-center justify-between w-full'>
            <h5>{`Posts ${numberOfPosts} `}</h5>
            <p className='text-xl'>
              {numberOfPosts && numberOfPosts > 5
                ? `Page:${page} / ${Math.ceil(numberOfPosts / 5)}`
                : ''}
            </p>
          </div>
          <div>
            {type === 'category' && (
              <Link href='/'>
                <Button variant={'secondary'} className='font-bold '>
                  All posts
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Spacer size={6} />
      <Row className=' items-center'>
        {posts?.length > 0 ? (
          posts?.map((post, index) => {
            return (
              <Col key={index} lg={12} md={2} className='mb-8'>
                <div data-aos='fade-up' data-aos-delay={index * 50}>
                  <Link
                    href={
                      type === 'my-articles'
                        ? `/my-articles/${post.slug}`
                        : `/blog/${post.slug}`
                    }
                  >
                    <Row className='dark:border-baseline-100 border-baseline-400  rounded-lg overflow-hidden shadow-lg dark:shadow-baseline-800 scale-100 hover:scale-105 transition-all duration-200 ease-in-out'>
                      <Col lg={6} md={2}>
                        <Row>
                          <div className='h-[250px] w-full relative '>
                            <Image
                              className='w-full object-cover'
                              src={post.img || '/default-cover-image.webp'}
                              alt={post.title}
                              fill
                            />
                          </div>
                        </Row>
                      </Col>
                      <Col
                        lg={6}
                        md={2}
                        className='flex  items-center justify-between'
                      >
                        <div className='flex justify-between flex-col items-start max-w-[80%]'>
                          <div className='flex justify-between w-full '>
                            <div>
                              <div className='flex gap-2 text-s text-baseline-400'>
                                <p className=' text-baseline-400 font-bold'>
                                  {post.user?.name}
                                </p>
                                -
                                <p>
                                  {format(
                                    new Date(post.createdAt),
                                    'MMM dd yyyy'
                                  )}
                                </p>{' '}
                                -
                                <p className=' text-error-500 line-clamp-2'>
                                  {post.cat?.title}
                                </p>
                              </div>

                              <Spacer size={2} />
                              <p className='text-xl font-bold line-clamp-2'>
                                {post.title}
                              </p>

                              <div
                                className='line-clamp-4  text-s! max-w-[70%]  dark:text-baseline-300 text-baseline-500'
                                dangerouslySetInnerHTML={{
                                  // parse headings and images to paragraphs
                                  __html: post.desc.replace(
                                    /<(\/?)h[12345](.*?)>|<img.*?>/g,
                                    '<$1p$2>'
                                  ),
                                }}
                              />

                              <Spacer size={2} />

                              <div className='flex gap-4'>
                                <Button variant={'link'} size={'medium'}>
                                  Read More
                                </Button>

                                <div className='flex gap-2 items-center'>
                                  <p className='text-sm'>{post.views}</p>
                                  <Eye />
                                </div>

                                {type === 'my-articles' && (
                                  <div className='ml-4 flex items-center'>
                                    <p>{post.public ? 'Public' : 'Private'}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {type === 'my-articles' && (
                          <div className='flex h-full flex-col justify-start gap-4'>
                            <X
                              className=' cursor-pointer dark:text-white'
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleDeletePost(post.slug);
                              }}
                            />

                            <Edit
                              className=' cursor-pointer dark:text-white'
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                router.push(
                                  `/my-articles/edit-article/${post.slug}`
                                );
                              }}
                            />
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Link>
                </div>
              </Col>
            );
          })
        ) : (
          <Col>
            <Spacer size={8} />
            <p className='text-xl font-bold'>
              No posts found, try with other categories
            </p>
          </Col>
        )}
      </Row>
    </>
  );
}

export default RecentPosts;

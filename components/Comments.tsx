'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from './UI/Grid';
import { Input } from './UI/Input/Input';
import { Button } from './UI/Button/Button';
import { Spacer } from './UI/spacer/spacer';
import Image from 'next/image';
import { CommentType } from '@/consts/types';
import toast from 'react-hot-toast';
import { format, set } from 'date-fns';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useWindowSize } from '@/lib/useWindowSize';
import breakpoints from '@/lib/breakpoint';
import { Newspaper, Smile, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Loader } from './UI/loader/loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/UI/Modal/modal';

const MOBILE_MAX_BREAKPOINT = breakpoints.mobile.breakpoints.max;

async function getComments(postSlug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return toast.error('Base url not found');
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?postSlug=${postSlug}`,
      {
        cache: 'no-cache',
      }
    );

    if (!response.ok) {
      throw new Error('This blog was not found');
    }

    const responseData = await response.json(); //return data as JSON

    return responseData;
  } catch (error: any) {
    console.log(error.message);
    toast.error(error.message);
  }
}

function Comments({ postSlug }: { postSlug: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [windowWidth] = useWindowSize();
  const [comment, setComment] = useState({ comment: '', error: '' });
  // EMOJI PICKER
  const [showPicker, setShowPicker] = useState(false); // To toggle emoji picker

  const [commentsData, setCommentsData] = useState<CommentType[]>([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState({
    modal: false,
    postSlug: '',
    commentId: '',
  });

  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // SEND MESSAGE HANDLER
  async function handleSendComment() {
    setLoading(true);
    const baseUtl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUtl) {
      return toast.error('Base url not found');
    }
    try {
      if (comment.comment.length > 0) {
        // send req
        const response = await fetch(`${baseUtl}/api/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postSlug: postSlug,
            desc: comment.comment,
          }),
        });

        // Clear input and close emoji after it was submitted successfully
        if (response.ok) {
          toast.success('Comment added successfully');
          setComment({ comment: '', error: '' });
          setShowPicker(false);
        }

        // IF THE COMMENT WAS ADDED SUCCESSFULLY, FETCH LAST COMMENTS
        fetchComments();
        async function fetchComments() {
          const commentData = await getComments(postSlug);
          setCommentsData(commentData);
        }
        setLoading(false);
      } else {
        setComment((prev) => {
          return {
            ...prev,
            error: 'Please enter a comment',
          };
        });

        setLoading(false);

        throw new Error('Please enter at least one character');
      }
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  // HANDLE EMOJI SELECTION
  const handleEmojiClick = (emojiData: any) => {
    setComment((prev) => {
      return {
        ...prev,
        comment: prev.comment + emojiData.emoji,
      };
    });
  };

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      const commentData = await getComments(postSlug);

      setCommentsData(commentData);
      if (commentData) {
        setLoading(false);
      }
    }
    fetchComments();
  }, []);

  // HANDLE KEYPRESS (to delete emojis or text)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setComment((prev) => {
        return {
          ...prev,
          comment: prev.comment.slice(0, -1),
        };
      });
    }
    if (e.key === 'Enter' && comment.comment) {
      handleSendComment();
      setShowPicker(false);
    }
  };

  async function handleDeleteComment(commentId: string, postSlug: string) {
    setDeleteModalOpen({
      modal: true,
      postSlug: postSlug,
      commentId: commentId,
    });
  }
  async function handleConfirmDeleteComment() {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: deleteModalOpen.commentId,
          }),
        }
      );

      if (response.ok) {
        toast.success('Comment deleted successfully');

        // IF THE COMMENT WAS DELETED SUCCESSFULLY, FETCH LAST COMMENTS
        fetchComments();
        async function fetchComments() {
          const commentData = await getComments(postSlug);
          setCommentsData(commentData);
          if (commentData) {
            setLoading(false);
          }
        }
        setDeleteModalOpen({
          modal: false,
          postSlug: '',
          commentId: '',
        });
      }
    } catch (error: any) {
      setLoading(false);

      toast.error(error.message);
      setDeleteModalOpen({
        modal: false,
        postSlug: '',
        commentId: '',
      });
    }
  }

  function isOwnerOfTheBlog(ownerEmailOfTheBlog: string) {
    // IF THE CURRENT LOGGED USER IS THE OWNER OF THE BLOG, SHOW DELETE BUTTON
    if (session?.user && session?.user.email === ownerEmailOfTheBlog) {
      return true;
    }
    return false;
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(e.target as Node)
    ) {
      setShowPicker(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return (
    <Row>
      <Col>
        {/* MODAL DELETE COMMENT */}
        <Dialog
          open={deleteModalOpen.modal}
          onOpenChange={() =>
            setDeleteModalOpen((prev) => {
              return { ...prev, modal: !prev.modal };
            })
          }
        >
          <DialogContent className=' z-50 border border-baseline-100 bg-white dark:bg-baseline-700 '>
            <DialogHeader
              className='dark:text-white'
              title={'  Are you absolutely sure?'}
              position={'center-aligned'}
              description={
                'This action cannot be undone. This will permanently delete your comment.'
              }
              icon={<Newspaper />}
            ></DialogHeader>
            <DialogFooter
              position='horizontal-fill'
              onCancel={() =>
                setDeleteModalOpen({
                  modal: false,
                  postSlug: '',
                  commentId: '',
                })
              }
              onConfirm={() => handleConfirmDeleteComment()}
            ></DialogFooter>
          </DialogContent>
        </Dialog>

        <p className='text-xl font-bold'>Comments {commentsData?.length}</p>
        <Spacer size={2} />
        <div className='relative' ref={emojiPickerRef}>
          <Input
            disabled={
              loading || status === 'loading' || status === 'unauthenticated'
            }
            value={comment.comment}
            onChange={(e) => {
              setComment({ ...comment, comment: e.target.value });
            }}
            type={'textarea'}
            placeholder={'write a comment...'}
            className={'h-16 pt-2 pb-2 pl-4 pr-12  rounded-md bg-baseline-100'}
            label={''}
            error={comment.error}
            onKeyDown={(e) => handleKeyDown(e)}
            rightIcon={
              <Smile
                className={cn(
                  ' rounded-full absolute right-2 bottom-5',
                  showPicker
                    ? 'text-tertiary-800 ring-4 ring-tertiary-500'
                    : 'text-black '
                )}
                onClick={() => setShowPicker((prev) => !prev)}
              >
                {showPicker ? 'Hide Emoji Picker' : 'Show Emoji Picker'}
              </Smile>
            }
          />

          {showPicker && (
            <div className='absolute lg:-left-4 md:left-4 sm:-left-5  bottom-24   rounded-lg p-4 z-10'>
              <EmojiPicker
                className=' dark:bg-baseline-900 '
                theme={Theme.AUTO}
                height={windowWidth < MOBILE_MAX_BREAKPOINT ? 300 : 450}
                width={windowWidth < MOBILE_MAX_BREAKPOINT ? 225 : 400}
                onEmojiClick={handleEmojiClick}
              />
            </div>
          )}
        </div>
        <Spacer size={2} />
        <Button
          loading={loading || status === 'loading'}
          onClick={() => {
            status === 'unauthenticated'
              ? router.push('/sign-in')
              : handleSendComment();
          }}
          className='w-full'
        >
          {status === 'unauthenticated' ? 'Log in' : 'Send'}
        </Button>
        <Spacer size={16} md={12} sm={8} />

        {loading ? (
          <div className='flex justify-center items-center'>
            <Spacer size={8} />
            <Loader variant={'primary'} size={'large'} />
            <Spacer size={8} />
          </div>
        ) : commentsData?.length > 0 ? (
          commentsData?.map((comment, index) => {
            return (
              <div className='flex  mb-16 flex-col ' key={index}>
                <div className='flex justify-between'>
                  <div className='flex items-center gap-4'>
                    {comment?.user.image && (
                      <Image
                        src={comment?.user.image}
                        alt='blog image'
                        width={50}
                        height={50}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                    )}

                    <div className='text-baseline-400'>
                      <p className='font-semibold '>{comment?.user.name}</p>
                      <p className='text-s '>
                        {format(new Date(comment.createdAt), 'MMM dd yyyy')}
                      </p>
                    </div>
                  </div>
                  {isOwnerOfTheBlog(comment.post?.userEmail) ? (
                    <div>
                      <X
                        className=' cursor-pointer'
                        onClick={() =>
                          handleDeleteComment(comment.id, comment.postSlug)
                        }
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <Spacer size={8} />
                <p className=''>{comment.desc}</p>
              </div>
            );
          })
        ) : (
          <>
            <p>No comments yet</p>
          </>
        )}
      </Col>
    </Row>
  );
}

export default Comments;

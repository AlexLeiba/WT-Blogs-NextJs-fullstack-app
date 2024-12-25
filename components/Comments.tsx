'use client';
import React, { useEffect, useState } from 'react';
import { Col, Row } from './UI/Grid';
import { Input } from './UI/Input/Input';
import { Button } from './UI/Button/Button';
import { Spacer } from './UI/spacer/spacer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendComment } from '@/lib/zodSchemas';
import z from 'zod';
import Image from 'next/image';
import { CommentType } from '@/consts/types';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useWindowSize } from '@/lib/useWindowSize';
import breakpoints from '@/lib/breakpoint';
import { Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import { title } from 'process';
const MOBILE_MAX_BREAKPOINT = breakpoints.mobile.breakpoints.max;

async function getComments(postSlug: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/comments?postSlug=${postSlug}`,
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
  const [windowWidth] = useWindowSize();
  const [comment, setComment] = useState({ comment: '', error: '' });
  // EMOJI PICKER
  const [showPicker, setShowPicker] = useState(false); // To toggle emoji picker

  // SEND MESSAGE HANDLER
  async function handleSendComment() {
    try {
      if (comment.comment.length > 0) {
        // send req
        const response = await fetch(`http://localhost:3000/api/comments`, {
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
      } else {
        setComment((prev) => {
          return {
            ...prev,
            error: 'Please enter a comment',
          };
        });

        throw new Error('Please enter at least one character');
      }
    } catch (error: any) {
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

  const [commentsData, setCommentsData] = useState<CommentType[]>([]);

  useEffect(() => {
    async function fetchComments() {
      const commentData = await getComments(postSlug);
      console.log('🚀 ~ fetchComments ~ commentData:', commentData);
      setCommentsData(commentData);
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

  return (
    <Row>
      <Col>
        <p className='text-xl font-bold'>Comments {commentsData?.length}</p>
        <Spacer size={2} />
        <div className='relative'>
          <Input
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
        <Button onClick={() => handleSendComment()} className='w-full'>
          Send
        </Button>
        <Spacer size={16} />

        {commentsData?.length > 0 ? (
          commentsData?.map((comment, index) => {
            return (
              <div className='flex  mb-16 flex-col ' key={index}>
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

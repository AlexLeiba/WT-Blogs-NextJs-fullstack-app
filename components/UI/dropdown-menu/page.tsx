'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from '@/components/ui/dropdown-menu';
import { Col, Container, Row } from '@/components/Grid';
import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import { Checkbox } from '@/components/ui/checkbox';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function DropdownMenuDemo() {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const FormSchema = z.object({
    profile: z.boolean(),
    billing: z.boolean(),
    settings: z.boolean(),
    keyboardShortcuts: z.boolean(),
    github: z.boolean(),
    support: z.boolean(),
    api: z.boolean(),
  });

  const { control, handleSubmit } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profile: false,
      billing: false,
      settings: false,
      keyboardShortcuts: false,
      github: false,
      support: false,
      api: false,
    },
  });

  function handleCheckboxSubmit(formData: z.infer<typeof FormSchema>) {
    console.log('handleCheckboxSubmit ~ formData:', formData);
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className='h-16'></div>
          <h2>Simple Dropdown Menu</h2>
          <div className='h-10'></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Keyboard shortcuts</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuItem>
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <div className='h-10'></div>
            <h3>Simple Dropdown Menu</h3>
            <div className='h-10'></div>

            <pre>
              <code className='typescript'>
                {`
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary'>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Keyboard shortcuts</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  `}
              </code>
            </pre>
          </div>
          <div className='h-16'></div>
          <div className='m-auto h-0.5 w-full bg-black'></div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='h-16'></div>
          <h2>Dropdown Menu with separator and side left</h2>
          <div className='h-10'></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' side='left'>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Keyboard shortcuts</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <div className='h-10'></div>
            <h3>Dropdown Menu with separator and side left</h3>
            <div className='h-10'></div>

            <pre>
              <code className='typescript'>
                {`
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
  } from '@/components/ui/dropdown-menu';

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='secondary'>Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56' side='left'>
      <DropdownMenuLabel>Menu</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Keyboard shortcuts</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <span>API</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  `}
              </code>
            </pre>
          </div>
          <div className='h-16'></div>
          <div className='m-auto h-0.5 w-full bg-black'></div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='h-16'></div>
          <h2>Dropdown Menu with separator and side right</h2>
          <div className='h-10'></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' side='right'>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Keyboard shortcuts</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <div className='h-10'></div>
            <h3>Dropdown Menu with separator and side right</h3>
            <div className='h-10'></div>

            <pre>
              <code className='typescript'>
                {`
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
  } from '@/components/ui/dropdown-menu';

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='secondary'>Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56' side='right'>
      <DropdownMenuLabel>Menu</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Keyboard shortcuts</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <span>API</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  `}
              </code>
            </pre>
          </div>
          <div className='h-16'></div>
          <div className='m-auto h-0.5 w-full bg-black'></div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='h-16'></div>
          <h2>Dropdown Menu with separator and side top</h2>
          <div className='h-10'></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' side='top'>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Keyboard shortcuts</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <div className='h-10'></div>
            <h3>Dropdown Menu with separator and side top</h3>
            <div className='h-10'></div>

            <pre>
              <code className='typescript'>
                {`
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
  } from '@/components/ui/dropdown-menu';

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='secondary'>Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56' side='top'>
      <DropdownMenuLabel>Menu</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Keyboard shortcuts</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <span>API</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  `}
              </code>
            </pre>
          </div>
          <div className='h-16'></div>
          <div className='m-auto h-0.5 w-full bg-black'></div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='h-16'></div>
          <h2>Dropdown Menu with submenu and align start</h2>
          <div className='h-10'></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='start'>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Keyboard shortcuts</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>Invite users</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className='bg-white'>
                      <DropdownMenuItem>
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <span>More...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <span>New Team</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <div className='h-10'></div>
            <h3>Dropdown Menu with submenu and align start</h3>
            <div className='h-10'></div>

            <pre>
              <code className='typescript'>
                {`
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='secondary'>Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56' align='start'>
      <DropdownMenuLabel>Menu</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Keyboard shortcuts</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className='bg-white'>
              <DropdownMenuItem>
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <span>New Team</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  `}
              </code>
            </pre>
          </div>
          <div className='h-16'></div>
          <div className='m-auto h-0.5 w-full bg-black'></div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className='h-16'></div>
          <h2>Dropdown Menu with submenu and align end</h2>
          <div className='h-10'></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end'>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Keyboard shortcuts</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>Invite users</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className='bg-white'>
                      <DropdownMenuItem>
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <span>More...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <span>New Team</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <div className='h-10'></div>
            <h3>Dropdown Menu with submenu and align end</h3>
            <div className='h-10'></div>

            <pre>
              <code className='typescript'>
                {`
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='secondary'>Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56' align='end'>
      <DropdownMenuLabel>Menu</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Keyboard shortcuts</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className='bg-white'>
              <DropdownMenuItem>
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <span>New Team</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  `}
              </code>
            </pre>
          </div>
          <div className='h-16'></div>
        </Col>
      </Row>

      {/*  */}

      <Row>
        <Col>
          <div className='h-16'></div>
          <h2>Simple Dropdown Menu with checkbox</h2>
          <div className='h-10'></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <Controller
                control={control}
                name='profile'
                render={({ field }) => {
                  return (
                    <>
                      <DropdownMenuRadioGroup className='flex justify-between  px-3'>
                        <span>Profile</span>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(v) => field.onChange(v)}
                        />
                      </DropdownMenuRadioGroup>
                    </>
                  );
                }}
              />
              <Controller
                control={control}
                name='billing'
                render={({ field }) => {
                  return (
                    <DropdownMenuRadioGroup className='flex justify-between  px-3'>
                      <span>Billing</span>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(v)}
                      />
                    </DropdownMenuRadioGroup>
                  );
                }}
              />
              <Controller
                control={control}
                name='settings'
                render={({ field }) => {
                  return (
                    <DropdownMenuRadioGroup className='flex justify-between  px-3'>
                      <span>Settings</span>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(v)}
                      />
                    </DropdownMenuRadioGroup>
                  );
                }}
              />
              <Controller
                control={control}
                name='keyboardShortcuts'
                render={({ field }) => {
                  return (
                    <DropdownMenuRadioGroup className='flex justify-between  px-3'>
                      <span>Keyboard shortcuts</span>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(v)}
                      />
                    </DropdownMenuRadioGroup>
                  );
                }}
              />
              <Controller
                control={control}
                name='github'
                render={({ field }) => {
                  return (
                    <DropdownMenuRadioGroup className='flex justify-between  px-3'>
                      <span>GitHub</span>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(v)}
                      />
                    </DropdownMenuRadioGroup>
                  );
                }}
              />
              <Controller
                control={control}
                name='support'
                render={({ field }) => {
                  return (
                    <DropdownMenuRadioGroup className='flex justify-between  px-3'>
                      <span>Support</span>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(v)}
                      />
                    </DropdownMenuRadioGroup>
                  );
                }}
              />
              <Controller
                control={control}
                name='api'
                render={({ field }) => {
                  return (
                    <DropdownMenuRadioGroup className='flex justify-between  px-3'>
                      <span>API</span>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(v)}
                      />
                    </DropdownMenuRadioGroup>
                  );
                }}
              />

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleSubmit(handleCheckboxSubmit)}>
                <span>Submit</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <div className='h-10'></div>
            <h3>The code for simple Dropdown Menu with checkbox</h3>
            <div className='h-10'></div>

            <pre>
              <code className='typescript'>
                {`
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
  } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';



const FormSchema = z.object({
  profile: z.boolean(),
  billing: z.boolean(),
  settings: z.boolean(),
  keyboardShortcuts: z.boolean(),
  github: z.boolean(),
  support: z.boolean(),
  api: z.boolean(),
});

const { control, handleSubmit } = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
    profile: false,
    billing: false,
    settings: false,
    keyboardShortcuts: false,
    github: false,
    support: false,
    api: false,
  },
});

function handleCheckboxSubmit(formData: z.infer<typeof FormSchema>) {
  console.log('handleCheckboxSubmit ~ formData:', formData);
}

<DropdownMenu>
<DropdownMenuTrigger asChild>
  <Button variant='secondary'>Open</Button>
</DropdownMenuTrigger>
<DropdownMenuContent className='w-56'>
  <DropdownMenuLabel>Menu</DropdownMenuLabel>
  <Controller
    control={control}
    name='profile'
    render={({ field }) => {
      return (
        <>
          <DropdownMenuRadioGroup className='flex justify-between  px-3'>
            <span>Profile</span>
            <Checkbox
              checked={field.value}
              onCheckedChange={(v) => field.onChange(v)}
            />
          </DropdownMenuRadioGroup>
        </>
      );
    }}
  />
  <Controller
    control={control}
    name='billing'
    render={({ field }) => {
      return (
        <DropdownMenuRadioGroup className='flex justify-between  px-3'>
          <span>Billing</span>
          <Checkbox
            checked={field.value}
            onCheckedChange={(v) => field.onChange(v)}
          />
        </DropdownMenuRadioGroup>
      );
    }}
  />
  <Controller
    control={control}
    name='settings'
    render={({ field }) => {
      return (
        <DropdownMenuRadioGroup className='flex justify-between  px-3'>
          <span>Settings</span>
          <Checkbox
            checked={field.value}
            onCheckedChange={(v) => field.onChange(v)}
          />
        </DropdownMenuRadioGroup>
      );
    }}
  />
  <Controller
    control={control}
    name='keyboardShortcuts'
    render={({ field }) => {
      return (
        <DropdownMenuRadioGroup className='flex justify-between  px-3'>
          <span>Keyboard shortcuts</span>
          <Checkbox
            checked={field.value}
            onCheckedChange={(v) => field.onChange(v)}
          />
        </DropdownMenuRadioGroup>
      );
    }}
  />
  <Controller
    control={control}
    name='github'
    render={({ field }) => {
      return (
        <DropdownMenuRadioGroup className='flex justify-between  px-3'>
          <span>GitHub</span>
          <Checkbox
            checked={field.value}
            onCheckedChange={(v) => field.onChange(v)}
          />
        </DropdownMenuRadioGroup>
      );
    }}
  />
  <Controller
    control={control}
    name='support'
    render={({ field }) => {
      return (
        <DropdownMenuRadioGroup className='flex justify-between  px-3'>
          <span>Support</span>
          <Checkbox
            checked={field.value}
            onCheckedChange={(v) => field.onChange(v)}
          />
        </DropdownMenuRadioGroup>
      );
    }}
  />
  <Controller
    control={control}
    name='api'
    render={({ field }) => {
      return (
        <DropdownMenuRadioGroup className='flex justify-between  px-3'>
          <span>API</span>
          <Checkbox
            checked={field.value}
            onCheckedChange={(v) => field.onChange(v)}
          />
        </DropdownMenuRadioGroup>
      );
    }}
  />

  <DropdownMenuSeparator />

  <DropdownMenuItem onClick={handleSubmit(handleCheckboxSubmit)}>
    <span>Submit</span>
  </DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
  `}
              </code>
            </pre>
          </div>
          <div className='h-16'></div>
          <div className='m-auto h-0.5 w-full bg-black'></div>
        </Col>
      </Row>
    </Container>
  );
}

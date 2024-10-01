import { Subject } from '@/entities/subject.entity'

describe('Entity subject', () => {
  it('It should create a new subject object and define its values', async () => {
    const newSubject = new Subject()
    newSubject.id = '1e5eaf1c-5c9c-4efb-9f80-5c10e99e76f4'
    newSubject.name = 'Test Subject'
    newSubject.status = 1
    newSubject.created_at = new Date()
    newSubject.updated_at = new Date()

    expect(newSubject).toBeInstanceOf(Subject)
    expect(newSubject.id).toBe('1e5eaf1c-5c9c-4efb-9f80-5c10e99e76f4')
    expect(newSubject.name).toBe('Test Subject')
    expect(newSubject.status).toBe(1)
    expect(newSubject.created_at).toBeInstanceOf(Date)
    expect(newSubject.updated_at).toBeInstanceOf(Date)
  })
})
